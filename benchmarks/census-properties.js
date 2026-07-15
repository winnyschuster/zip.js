import { readFileSync } from "node:fs";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { domprops } from "../node_modules/terser/tools/domprops.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundlePath = process.argv[2] || path.join(ROOT, "index.min.js");
const jsonPath = process.argv[3];

const unquotedCounts = new Map();
const quotedNames = new Set();
collectBundleNames(bundlePath);
const publicNames = collectDeclarationNames(path.join(ROOT, "index.d.ts"));
const boundaryNames = collectBoundaryNames(path.join(ROOT, "rollup.config.js"));
const builtinNames = new Set(domprops);

const classes = { public: [], builtin: [], boundary: [], candidate: [] };
for (const [name, count] of unquotedCounts) {
	const bytes = count * (name.length - 1);
	const entry = { name, count, bytes, quotedAlso: quotedNames.has(name) };
	if (builtinNames.has(name)) {
		classes.builtin.push(entry);
	} else if (boundaryNames.has(name)) {
		classes.boundary.push(entry);
	} else if (publicNames.has(name)) {
		classes.public.push(entry);
	} else {
		classes.candidate.push(entry);
	}
}

for (const entries of Object.values(classes)) {
	entries.sort((first, second) => second.bytes - first.bytes);
}
const totalBytes = (entries) => entries.reduce((total, entry) => total + entry.bytes, 0);
console.log("bundle:", path.relative(ROOT, bundlePath));
for (const [className, entries] of Object.entries(classes)) {
	console.log(className.padEnd(10), String(entries.length).padStart(4), "names", String(totalBytes(entries)).padStart(7), "bytes");
}
console.log("\ntop candidates (name, unquoted count, bytes, also-quoted):");
for (const { name, count, bytes, quotedAlso } of classes.candidate.slice(0, 40)) {
	console.log("  " + String(count).padStart(5) + "x " + name.padEnd(32) + String(bytes).padStart(6) + " B" + (quotedAlso ? "  QUOTED-ALSO" : ""));
}
if (jsonPath) {
	writeFileSync(jsonPath, JSON.stringify(classes, null, "\t"));
	console.log("\nwritten:", jsonPath);
}

function collectBundleNames(filePath) {
	const source = ts.createSourceFile(filePath, readFileSync(filePath, "utf8"), ts.ScriptTarget.Latest, true);
	visit(source);

	function visit(node) {
		if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
			countUnquoted(node.name.text);
		} else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) {
			quotedNames.add(node.argumentExpression.text);
		} else if (ts.isBinaryExpression(node) && node.operatorToken.kind == ts.SyntaxKind.InKeyword && ts.isStringLiteralLike(node.left)) {
			quotedNames.add(node.left.text);
		} else if (isMemberDeclaration(node)) {
			if (ts.isIdentifier(node.name)) {
				countUnquoted(node.name.text);
			} else if (ts.isStringLiteralLike(node.name)) {
				quotedNames.add(node.name.text);
			}
		} else if (ts.isShorthandPropertyAssignment(node)) {
			countUnquoted(node.name.text);
		} else if (ts.isBindingElement(node) && node.propertyName && ts.isIdentifier(node.propertyName)) {
			countUnquoted(node.propertyName.text);
		} else if (ts.isBindingElement(node) && !node.propertyName && ts.isIdentifier(node.name) && ts.isObjectBindingPattern(node.parent)) {
			countUnquoted(node.name.text);
		}
		ts.forEachChild(node, visit);
	}

	function isMemberDeclaration(node) {
		return (ts.isPropertyAssignment(node) || ts.isPropertyDeclaration(node) || ts.isMethodDeclaration(node) ||
			ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)) && node.name;
	}

	function countUnquoted(name) {
		unquotedCounts.set(name, (unquotedCounts.get(name) || 0) + 1);
	}
}

function collectDeclarationNames(filePath) {
	const names = new Set();
	const source = ts.createSourceFile(filePath, readFileSync(filePath, "utf8"), ts.ScriptTarget.Latest, false);
	visit(source);
	return names;

	function visit(node) {
		if ((ts.isPropertySignature(node) || ts.isMethodSignature(node) || ts.isPropertyDeclaration(node) ||
			ts.isMethodDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node) ||
			ts.isEnumMember(node) || ts.isParameter(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) ||
			ts.isFunctionDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableDeclaration(node)) &&
			node.name && (ts.isIdentifier(node.name) || ts.isStringLiteralLike(node.name))) {
			names.add(node.name.text);
		}
		ts.forEachChild(node, visit);
	}
}

function collectBoundaryNames(configPath) {
	const config = readFileSync(configPath, "utf8");
	const startIndex = config.indexOf("[", config.indexOf("reserved"));
	return new Set(JSON.parse(config.slice(startIndex, config.indexOf("]", startIndex) + 1)));
}

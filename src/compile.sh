#!/bin/bash
java -jar ../bower_components/compiler-latest/compiler.jar \
  --js=../bower_components/closure-library/closure/goog/**.js \
  --js=./**.js \
  --only_closure_dependencies \
  --closure_entry_point="qu" \
  --compilation_level=ADVANCED_OPTIMIZATIONS \
  --jscomp_error=accessControls \
  --jscomp_error=ambiguousFunctionDecl \
  --jscomp_error=checkDebuggerStatement \
  --jscomp_error=checkRegExp \
  --jscomp_error=checkStructDictInheritance \
  --jscomp_error=checkTypes \
  --jscomp_error=checkVars \
  --jscomp_error=const \
  --jscomp_error=constantProperty \
  --jscomp_error=deprecated \
  --jscomp_error=duplicateMessage \
  --jscomp_error=duplicate \
  --jscomp_error=es5Strict \
  --jscomp_error=externsValidation \
  --jscomp_error=fileoverviewTags \
  --jscomp_error=globalThis \
  --jscomp_error=inferredConstCheck \
  --jscomp_error=internetExplorerChecks \
  --jscomp_error=invalidCasts \
  --jscomp_error=misplacedTypeAnnotation \
  --jscomp_error=missingProperties \
  --jscomp_error=missingReturn \
  --jscomp_error=newCheckTypes \
  --jscomp_error=nonStandardJsDocs \
  --jscomp_error=suspiciousCode \
  --jscomp_error=strictModuleDepCheck \
  --jscomp_error=typeInvalidation \
  --jscomp_error=undefinedNames \
  --jscomp_error=undefinedVars \
  --jscomp_error=unknownDefines \
  --jscomp_error=uselessCode \
  --jscomp_error=visibility \
  --generate_exports \
  --output_wrapper="(function(){%output%})();" \
  > tmp.js
  # --jscomp_error=reportUnknownTypes \

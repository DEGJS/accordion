# Accordion
An accordion plugin, written in ES6 syntax.

## Sample Usage
``` javascript
let accordionInst = accordion(element, accordionOptions);
```

## Settings
``` javascript
let accordionOptions = {
	'closedOnInit': false,
	'openSlideIndexes': [0],
	'oneAtATime': true,
	'accordionSectionClass': 'js-accordion-section',
	'accordionHeadingClass': 'js-accordion-heading',
	'accordionTriggerClass': 'js-accordion-trigger',
	'accordionContentWrapperClass': 'js-accordion-content',
	'accordionHiddenClass': 'is-hidden',
	'accordionClosedClass': 'is-closed',
	'onSectionWrapComplete': null,
	'onSectionUnwrapComplete': null,
	'onSectionExpandComplete': null,
	'onSectionCollapseComplete': null
}
```

## Available Methods
* collapse()
* expand()
* destroy()

## Event Callbacks
* onSectionWrapComplete()
* onSectionUnwrapComplete()
* onSectionExpandComplete()
* onSectionCollapseComplete()

## Revision History
* **1.0.0:** First commit.
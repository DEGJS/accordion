import domUtils from "plugins/domUtils";
import objectUtils from "plugins/objectUtils";

let accordion = function(element, options) {

	let settings,
		accordionSections,
		oneAtATimeSet = false,
		defaults = {
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
		};


	function init() {
		settings = objectUtils.extend(this, defaults, options);
		if (element) {
			accordionSections = Array.prototype.slice.call(element.querySelectorAll('.' + settings.accordionSectionClass));
			if (accordionSections.length > 0) {
				wrapSections();
				bindEvents();
			}
		} else {
			console.log('No accordion element set.');
		}
	};

	function bindEvents() {
		document.addEventListener('click', onDocumentClick);
	};

	function unbindEvents() {
		document.removeEventListener('click', onDocumentClick);
	};

	function onDocumentClick(e) {
		if (domUtils.isDescendentByClass(settings.accordionTriggerClass, e.target) !== false) {
			let clickedParentSection = e.target.parentNode;
			if (clickedParentSection.getAttribute('data-accordion-override') === null) {
				e.preventDefault();
				if (clickedParentSection.classList.contains(settings.accordionClosedClass)) {
					expand(clickedParentSection);
				} else {
					collapse(clickedParentSection);
				}
			}			
		}
	};

	function wrapSections() {
		settings.initOpenSlideIndexes = objectUtils.convertToArray(settings.initOpenSlideIndexes);
		accordionSections.forEach(function(section, index) {
			let sectionContent = Array.prototype.slice.call(section.children),
				sectionContentWrapper = domUtils.createElement('div', settings.accordionContentWrapperClass),
				sectionHeadingEl = section.querySelector('.' + settings.accordionHeadingClass),
				sectionTriggerLink = sectionHeadingEl.getAttribute('href'),
				sectionTriggerTarget = '_self',
				sectionTriggerEl = domUtils.createElement('a', settings.accordionTriggerClass);

			if (sectionTriggerLink === null) {
				sectionTriggerLink = '#';
			} else {
				if (sectionHeadingEl.getAttribute('target') !== null) {
					sectionTriggerTarget = sectionHeadingEl.getAttribute('target');
				}
			}
			sectionTriggerEl.setAttribute('href', sectionTriggerLink);
			sectionTriggerEl.setAttribute('target', sectionTriggerTarget);
			sectionTriggerEl.textContent = sectionHeadingEl.textContent;
			
			if (settings.closedOnInit) {
				setToClosed(section);
			} else {
				if (settings.openSlideIndexes.indexOf(index) === -1) {
					setToClosed(section);
				} else {
					if (settings.oneAtATime) {
						if (oneAtATimeSet) {
							setToClosed(section);
						} else {
							oneAtATimeSet = true;
						}
					}
				}
			}
			domUtils.wrapElements(sectionContent, sectionContentWrapper);
			section.insertBefore(sectionTriggerEl, section.firstChild);
			domUtils.addCssClasses(sectionHeadingEl, [settings.accordionHiddenClass]);
		});
		if (settings.onSectionWrapComplete !== null) {
			settings.onSectionWrapComplete();
		}
	};

	function unwrapSections() {
		accordionSections.forEach(function(section, index) {
			let sectionTriggerEl = section.querySelector('.' + settings.accordionTriggerClass),
				sectionHeading = section.querySelector('.' + settings.accordionHeadingClass),
				sectonContentWrapper = section.querySelector('.' + settings.accordionContentWrapperClass);

			sectionTriggerEl.parentNode.removeChild(sectionTriggerEl);
			domUtils.removeCssClasses(section, [settings.accordionClosedClass]);
			domUtils.removeCssClasses(sectionHeading, [settings.accordionHiddenClass]);
			domUtils.unwrapElements(sectonContentWrapper);
		});
		if (settings.onSectionUnwrapComplete !== null) {
			settings.onSectionUnwrapComplete();
		}
	};

	function setToClosed(section) {
		domUtils.addCssClasses(section, [settings.accordionClosedClass]);
	};

	function expand(section) {
		if (settings.oneAtATime) {
			accordionSections.forEach(function(section) {
				domUtils.addCssClasses(section, [settings.accordionClosedClass]);
			})
		}
		domUtils.removeCssClasses(section, [settings.accordionClosedClass]);
		if (settings.onSectionExpandComplete !== null) {
			settings.onSectionExpandComplete(section);
		}
	};

	function collapse(section) {
		domUtils.addCssClasses(section, [settings.accordionClosedClass]);
		if (settings.onSectionCollapseComplete !== null) {
			settings.onSectionCollapseComplete(section);
		}
	};

	function destroy() {
		unbindEvents();
		unwrapSections();
	};

	init();

	return {
		collapse: collapse,
		expand: expand,
		destroy: destroy
	};

};

export default accordion;
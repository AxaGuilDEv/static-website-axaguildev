export default (classComponent, modifier) => (modifier !== '' ? ` ${classComponent}--${modifier}` : '');

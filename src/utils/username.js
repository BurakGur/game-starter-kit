import {ALL_DOWNCODE_MAPS} from '@constants/username';

const Downcoder = {
  Initialize: function () {
    if (Downcoder.map) {
      // already made
      return;
    }
    Downcoder.map = {};
    for (const lookup of ALL_DOWNCODE_MAPS) {
      Object.assign(Downcoder.map, lookup);
    }
    Downcoder.regex = new RegExp(Object.keys(Downcoder.map).join('|'), 'g');
  },
};

function downcode(slug = '') {
  Downcoder.Initialize();
  return slug.replace(Downcoder.regex, function (m) {
    return Downcoder.map[m];
  });
}

export const usernameFormatter = (s, num_chars, allowUnicode) => {
  // changes, e.g., "Petty theft" to "petty-theft"
  if (!allowUnicode) {
    s = downcode(s);
  }
  s = s.toLowerCase(); // convert to lowercase
  // if downcode doesn't hit, the char will be stripped here
  if (allowUnicode) {
    // Keep Unicode letters including both lowercase and uppercase
    // characters, whitespace, and dash; remove other characters.
    s = XRegExp.replace(s, XRegExp('[^-_\\p{L}\\p{N}\\s]', 'g'), '');
  } else {
    s = s.replace(/[^-\w\s]/g, ''); // remove unneeded chars
  }
  s = s.replace(/^\s+|\s+$/g, ''); // trim leading/trailing spaces
  s = s.replace(/[-\s]+/g, '-'); // convert spaces to hyphens
  s = s.substring(0, num_chars); // trim to first num_chars chars
  s = s.replace(/-+$/g, ''); // trim any trailing hyphens
  return s;
};

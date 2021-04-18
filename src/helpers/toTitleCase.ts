// function taken from https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
// converts string to title case
export default function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

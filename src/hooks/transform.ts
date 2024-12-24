export function transformString(input) {
    // Replace hyphens with spaces and then replace the word 'machine' with 'icon'
    return input.replace(/-/g, " ").replace(/\bmachine\b/, "icon");
  }
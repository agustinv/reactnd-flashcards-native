export function string_parameterize (str1) {
  return str1.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-")
}

export function timeToString (time = Date.now()) {
  return time.toString()
}


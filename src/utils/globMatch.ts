import micromatch from "micromatch"

export function globMatch(pattern: string, input: string): boolean {
  // We add a "/" because:
  //   micromatch.isMatch("", "**") => false
  //   micromatch.isMatch("/", "/**") => true
  // Note the argument order: `input` first, `pattern` second.
  return micromatch.isMatch("/" + input, "/" + pattern, {
    // if set to `false`, dotfiles will be ignored
    // unless a "." is explicitly defined in the pattern.
    dot: true,
  })
}

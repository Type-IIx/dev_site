import { PdcTs } from "pdc-ts";

export const convertToHtml = async (data : string) => {
  const pdcTs = new PdcTs();
  const result : string = await pdcTs.Execute({
    from : "vimwiki",
    to : "html",
    outputToFile : false,
    sourceText : data
  })
  return result
}

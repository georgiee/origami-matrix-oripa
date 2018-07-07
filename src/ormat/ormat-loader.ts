import { OrmatFile } from './ormat-file';

const TYPE_COMMENT = '#';
const TYPE_VERTEX = 'v';
const TYPE_FACE = 'f';

export class OrmatLoader {

  async load(url: string): Promise<OrmatFile> {
    const data = await fetch(url);
    const content = await data.text();
    const ormatFile = await this.parse(content);

    return ormatFile;
  }

  parse(content): OrmatFile {
    const lines = content.split('\n');
    const file = new OrmatFile();

    const vertices = [];
    const faces = [];
    const matrix = [];

    lines.forEach((line: string) => {
      const firstChar = line.charAt(0);

      if(firstChar === TYPE_VERTEX) {
        const vertex = this.parseVertex(line);
        vertices.push(vertex);
      } else if(firstChar === TYPE_FACE) {
        const face = this.parseFace(line);
        faces.push(face);
      } else if(firstChar === '#') {
        // ignore comments
      } else {
        // all unprefixed rows are part of the OR matrix.
        const elements = line.split(" ").map(v => parseInt(v, 10));
        // discard last element, it's only space.
        elements.pop();

        if(elements.length > 0) {
          matrix.push(elements);
        }
      }
    });

    file.orMatrix = matrix;
    file.vertices = vertices;
    file.faces = faces;

    return file;
  }

  parseVertex(data: string) {
    const parts = data.split(" ");
    parts.shift();
    return parts.map(v => parseInt(v, 10));
  }

  parseFace(data: string) {
    const parts = data.split(" ");
    parts.shift();
    return  parts.map(v => parseInt(v, 10) - 1);//index is based on 1, so decrease to normalize
  }

}
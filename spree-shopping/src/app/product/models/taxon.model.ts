export class Taxon {
  id: number;
  name: string;
  prettyName: string;
  permalink: string;
  parentId: number;
  taxonomyId: number;
  checked: boolean | false;
  taxons: Taxon[];
}

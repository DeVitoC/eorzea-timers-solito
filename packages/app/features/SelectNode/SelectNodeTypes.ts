export enum Profession {
	MINING = 'Mining',
	BOTANY = 'Botany',
	FISHING = 'Fishing',
  }
  
  export interface GatheringNodeController {
	buildList: (type: Profession) => Promise<Node[]>;
	sortList: (expoc: number, sortBy: number, searchString?: string) => Node[];
	getBackupList: (type: Profession) => Node[];
  }
  
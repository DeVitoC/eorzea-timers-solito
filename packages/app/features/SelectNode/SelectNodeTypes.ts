export enum Profession {
	MINING = 'Mining',
	BOTANY = 'Botany',
	FISHING = 'Fishing',
  }
  
export interface SelectNodesProps {
  profession: 'botany' | 'mining' | 'fishing';
}
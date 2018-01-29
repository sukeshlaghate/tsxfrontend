export type Colors = 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' |
  'pink' | 'brown' | 'grey' | 'black'

export interface ISidebarProps{
    visible:boolean;
    color?: Colors
}
export interface list{
    id:number;
    title:string;
     options: Array<{
         opt_id:number;
         option:string;
         vote:number;
     }>
}
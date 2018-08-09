export interface list{
    error:number;
    data:Array<{
    id:number;
    title:string;
     options: Array<{
         opt_id:number;
         option:string;
         vote:number;
     }>
    }>
}
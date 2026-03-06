import { Allow, Entity, Fields,  } from "remult";

@Entity("tasks", { allowApiCrud: Allow.authenticated,
  allowApiInsert:"admin",allowApiDelete:"admin" })
export class Task {
  @Fields.autoIncrement()
  id = 0;
  @Fields.string({
    validate: (task:Task)=>{
      if(task.title.length < 3){
        throw new Error("Title must be at least 3 characters long");
      }
    }
  })
  title = "";
  @Fields.boolean()
  completed = false;
}

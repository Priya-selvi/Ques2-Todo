class todoService{
    constructor(){
        this.todos=[];
        this.id=1;
    }
    getAllTodos(){
        return this.todos;
    }
    addTodo(title){
        const todo={
            id:this.id++,
            title,
            completed:false
        }
        this.todos.push(todo);
        return todo;
    }
    toggleTodo(id){
        const todo=this.todos.find(
            t=>t.id==Number(id)
        )
        if(!todo) return null;
        todo.completed=!todo.completed;
        return todo;
    }
    deleteTodo(id){
        this.todos=this.todos.filter(
            t=>t.id!==Number(id)
        )
    }
}

module.exports=new todoService();
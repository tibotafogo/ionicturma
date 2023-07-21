import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {
  private tarefas: Tarefa[] = [];

  constructor() { }

  public getTarefas(): Tarefa[]{
    return this.tarefas;
  }

  public addTarefas(descricao: string, data: string){
   data= data.replace("-","/")
   let tarefa: Tarefa = {descricao: descricao, data: new Date(data), status: false};
   this.tarefas.push(tarefa);
   this.setStorage();
   console.log(this.tarefas);
  }

public removeTarefas(index: number){
  this.tarefas.splice(index,1);
  this.setStorage();

}
public alterarTarefas(index: number,descricao: string, data: string){
  let tarefa: Tarefa = {descricao: descricao, data: new Date(data), status: false}
  tarefa.descricao = descricao;
  data = data.replace("-","/");
  tarefa.data = new Date(data);
  this.tarefas.splice(index,1,tarefa);
  this.setStorage();
}

public async setStorage(){
  await Preferences.set({
  key:'tarefas',
  value: JSON.stringify(this.tarefas)
  });
}

  public async getFromStorage(){
    const storedData = await Preferences.get({key: 'tarefas'});
    if(storedData.value){
      this.tarefas = JSON.parse(storedData.value);
    }else{
      this.tarefas = []
    }
  }
 }

interface Tarefa{
  descricao: string;
  data: Date;
  status?:boolean;

  
}
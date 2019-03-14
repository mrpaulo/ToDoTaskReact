import React, { Component } from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoList from './todoList'
import TodoForm from './todoForm'

const API_URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.state = { description: '', list: [] }

        this.refresh()
    }

    refresh(){
        Axios.get(`${API_URL}?sort=-createdAt`)
            .then((resp) => this.setState({...this.state, description: '', list: resp.data}))
    }
    
    handleAdd(){
        console.log(this)
        const description = this.state.description
        Axios.post(API_URL, {description})
            .then(resp=> this.refresh())
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleRemove(todo) {
        Axios.delete(`${API_URL}/${todo._id}`)
            .then(resp=> this.refresh())
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                description={this.state.description}
                handleChange={this.handleChange}
                handleAdd={this.handleAdd}
                />
                <TodoList list={this.state.list}
                handleRemove={this.handleRemove}
                />
            </div>
        )
    }
}
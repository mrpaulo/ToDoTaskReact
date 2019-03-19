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
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handlerClear = this.handlerClear.bind(this)

        this.state = { description: '', list: [] }

        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}` : ``

        Axios.get(`${API_URL}?sort=-createdAt${search}`)
            .then((resp) => this.setState({...this.state, description: description, list: resp.data}))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handlerClear(){
        this.refresh()
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

    handleMarkAsDone(todo) {
        Axios.put(`${API_URL}/${todo._id}`, {...todo, done: true})
            .then(resp=> this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        Axios.put(`${API_URL}/${todo._id}`, {...todo, done: false})
            .then(resp=> this.refresh(this.state.description))
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                description={this.state.description}
                handleChange={this.handleChange}
                handleAdd={this.handleAdd}
                handleSearch={this.handleSearch} 
                handlerClear={this.handlerClear} 
                />
                <TodoList list={this.state.list}
                handleRemove={this.handleRemove}
                handleMarkAsDone={this.handleMarkAsDone}
                handleMarkAsPending={this.handleMarkAsPending}
                />
            </div>
        )
    }
}
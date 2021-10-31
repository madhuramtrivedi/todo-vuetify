<template>
    <div class="todo pa-6">
        <v-text-field
            outlined
            v-model="newTaskTitle"
            @click:append="onAddTask"
            @keyup.enter="onAddTask"
            label="Add Task"
            append-icon="mdi-plus"
            hide-details
            clearable
        ></v-text-field>

        <v-list
            flat
            subheader
            three-line
            class="pt-0"
        >
            <div v-for="task in tasks" :key="task.id">
                <v-list-item @click="doneTask(task.id)" :class="{'blue lighten-5': task.done}">
                    <template v-slot:default>
                        <v-list-item-action>
                            <v-checkbox :input-value="task.done"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content :class="{'text-decoration-line-through': task.done}">
                            <v-list-item-title>{{task.title}}</v-list-item-title>
                            <v-list-item-subtitle>{{task.subtitle}}</v-list-item-subtitle>
                        </v-list-item-content>
                        
                        <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="290"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item-action>
                                    <v-btn icon v-bind="attrs" v-on="on">
                                        <v-icon color="primary lighten-1">mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </template>
                            <v-card>
                                <v-card-title class="text-h5">
                                    Deleting Task ?
                                </v-card-title>
                                <v-card-text>Are you sure you want to delete the task {{task.title}}</v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="red darken-1"
                                    text
                                    @click="onAgreeToDel(task.id)"
                                >
                                    Yes
                                </v-btn>
                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    No
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template> 
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </v-list>
    </div>
</template>
<script>

export default {
    name: "ToDo",
    data() {
        return {
            dialog: false,
            newTaskTitle: "",
            tasks: []
        }
    },
    methods: {
        doneTask(id) {
            let task = this.tasks.filter(t=> t.id === id);
            task[0].done = !task[0].done;
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t=> t.id !== id);
        },
        onAddTask() {
            this.tasks.push({
                id: Date.now(),
                title: this.newTaskTitle,
                subtitle: "",
                done: false
            });
            this.newTaskTitle = "";
        },
        onAgreeToDel(id) {
            this.deleteTask(id);
            this.dialog = false;
        }
    }
}
</script>

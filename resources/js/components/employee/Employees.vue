<template>
    <div class="container">
        <div class="row justify-content-center">

            <div class="col-md-12">
                <div class="card">

                    <div class="card-header">Employees</div>

                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th class="w-auto">First Name</th>
                                <th class="w-auto">Last Name</th>
                                <th class="w-auto">Email</th>
                                <th class="w-auto">Phone</th>
                                <th class="w-auto">Company</th>
                                <th class="text-center" colspan="2">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                                <tr v-for="employee in employees" :key="employee.id">
                                    <td style="vertical-align: middle">{{ employee.first_name }}</td>
                                    <td style="vertical-align: middle">{{ employee.last_name }}</td>
                                    <td style="vertical-align: middle">{{ employee.email }}</td>
                                    <td style="vertical-align: middle">{{ employee.phone }}</td>
                                    <td style="vertical-align: middle">{{ employee.company.name }}</td>
                                    <td class="text-center" style="vertical-align: middle;">
                                        <button @click="editEmployee(employee.id)" class="btn btn-sm btn-warning text-nowrap"><i class="fas fa-edit"></i> Edit</button>
                                    </td>
                                    <td class="text-center" style="vertical-align: middle;">
                                        <button @click="deleteEmployee(employee.id)" class="btn btn-sm btn-danger text-nowrap" type="submit"><i class="fas fa-trash"></i> Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

<!--                    <div class="card-footer">-->
<!--                        <div class="float-left">{{ $employees->links() }}</div>-->
<!--                        <div class="float-right" style="line-height: 2rem">{{ __('Total Records') }}: {{ $employees->total() }}</div>-->
<!--                    </div>-->

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                employees: {}
            };
        },
        methods: {
            editEmployee(id) {
                this.$router.push({name: 'employee-edit', params:{id: id}})
            },
            deleteEmployee(id) {
                this.$http.delete("/api/employees/" + id)
                    .then((response) => {
                        if(response.data.success) {
                            this.$http.get("/api/employees")
                                .then((response) => { this.employees = response.data })
                                .catch((error) => { console.log(error) })
                        }
                    })
                    .catch((error) => { console.log(error) })
            }
        },
        mounted() {
            this.$http.get("/api/employees")
                .then((response) => { this.employees = response.data })
                .catch((error) => { console.log(error) })
        }
    }
</script>

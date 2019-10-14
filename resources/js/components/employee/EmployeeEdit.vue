<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">

                <div class="alert alert-danger mb-3" v-if="errors.length">
                    <ul class="mb-0">
                        <li v-for="error in errors">{{ error[0] }}</li>
                    </ul>
                </div>

                <div v-if="submitted && success">
                    <div class="alert alert-success">
                        {{ success }}
                    </div>
                    <div class="text-center">
                        <router-link to="/employees" class="btn btn-sm btn-primary">
                            <i class="fas fa-home"></i> Employees
                        </router-link>
                    </div>
                </div>

                <div class="card" v-else>
                    <div class="card-header">Edit Employee</div>
                    <form @submit.prevent="submitForm">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-bind:class="{ 'is-invalid' : errors.first_name }" name="first_name" placeholder="First name" v-model="employee.first_name" />
                                <span class="invalid-feedback" role="alert" v-if="errors.first_name">
                                    <strong>{{ errors.first_name[0] }}</strong>
                                </span>
                            </div>

                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-bind:class="{ 'is-invalid' : errors.last_name }" name="last_name" placeholder="Last name" v-model="employee.last_name" />
                                <span class="invalid-feedback" role="alert" v-if="errors.last_name">
                                    <strong>{{ errors.last_name[0] }}</strong>
                                </span>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" v-bind:class="{ 'is-invalid' : errors.email }" name="email" placeholder="Email" v-model="employee.email" />
                                <span class="invalid-feedback" role="alert" v-if="errors.email">
                                    <strong>{{ errors.email[0] }}</strong>
                                </span>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" v-bind:class="{ 'is-invalid' : errors.phone }" name="phone" placeholder="Phone" v-model="employee.phone" />
                            </div>

                            <div class="form-group">
                                <label>Company</label>
                                <select class="form-control" name="company_id" v-model="employee.company_id">
                                    <option v-for="company in companies" v-bind:value="company.id">{{ company.name }}</option>
                                </select>
                            </div>

                        </div>

                        <div class="card-footer">
                            <router-link to="/employees" class="btn btn-danger">
                                <i class="fas fa-step-backward"></i> Cancel
                            </router-link>
                            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Update</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                employee: {},
                companies: {},
                submitted: false,
                errors: '',
                success: '',
            };
        },
        methods: {
            submitForm() {
                //submit
                this.$http.post('/api/employees/' + this.$route.params.id,
                    {
                        'id': this.employee.id,
                        'first_name': this.employee.first_name,
                        'last_name': this.employee.last_name,
                        'email': this.employee.email,
                        'phone': this.employee.phone,
                        'company_id': this.employee.company_id,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                )
                    .then((response) => {
                        if(response.data.errors) {
                            this.success = '';
                            this.errors = response.data.errors;
                        }
                        else  {
                            this.employee = {};
                            this.submitted = true;
                            this.errors = '';
                            this.success = response.data.success;
                        }
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                        console.log(error.response.data)
                    });
            }
        },
        mounted() {
            this.$http.get("/api/employees/" + this.$route.params.id)
                .then((response) => {
                    this.employee = response.data.employee;
                    this.companies = response.data.companies;
                })
                .catch((error) => { console.log(error) })
        }
    }
</script>

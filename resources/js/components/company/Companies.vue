<template>
    <div class="container">
        <div class="row justify-content-center">
<!--            @if(session()->get('success'))-->
<!--            <div class="col-md-12 mb-2">-->
<!--                <div class="alert alert-success alert-dismissible fade show w-100" role="alert">-->
<!--                    {{ session()->get('success') }}-->
<!--                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">-->
<!--                        <span aria-hidden="true">&times;</span>-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--            @endif-->

            <div class="col-md-12">
                <div class="card">

                    <div class="card-header">Companies</div>

                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th class="w-auto">Logo</th>
                                <th class="w-auto">Company</th>
                                <th class="w-auto">Website</th>
                                <th class="w-auto">Email</th>
                                <th class="text-center" colspan="2">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                                <tr v-for="company in companies" :key="company.id">
                                    <td class="text-center">
                                        <img :src="'storage/' + company.logo" style="width: 60px; height: 60px;">
                                    </td>
                                    <td style="vertical-align: middle">{{ company.name }}</td>
                                    <td style="vertical-align: middle">{{ company.website }}</td>
                                    <td style="vertical-align: middle">{{ company.email }}</td>
                                    <td class="text-center" style="vertical-align: middle;">
                                        <button @click="editCompany(company.id)" class="btn btn-sm btn-warning text-nowrap"><i class="fas fa-edit"></i> Edit</button>
                                    </td>
                                    <td class="text-center" style="vertical-align: middle;">
                                        <form :action="'/company/' + company.id" method="post">
                                            <button class="btn btn-sm btn-danger text-nowrap" type="submit"><i class="fas fa-trash"></i> Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

<!--                    <div class="card-footer">-->
<!--                        <div class="float-left">{{ $companies->links() }}</div>-->
<!--                        <div class="float-right" style="line-height: 2rem">{{ __('Total Records') }}: {{ $companies->total() }}</div>-->
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
                companies: {}
            };
        },
        methods: {
            editCompany(id) {
                this.$router.push({name: 'company-edit', params:{id: id}})
            }
        },
        mounted() {
            this.$http.get("/api/companies")
                .then((response) => { this.companies = response.data })
                .catch((error) => { console.log(error) })
        }
    }
</script>

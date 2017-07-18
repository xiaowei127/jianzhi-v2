
import * as types from '../mutation-types'
import axios from 'axios';

const state = {
    showAlert: null,
    id:'',
    title:'',
    daterange:[],
    start_date:'',
    end_date:'',
    timerange:[new Date(2016, 9, 10, 10, 0), new Date(2016, 9, 10, 18, 0)],
    start_time:'',
    end_time:'',
    location:[],
    city:'',
    district:'',
    address:'',
    pay_amount:'',
    settlement_type:'',
    pay_type:'',
    pay_time:'',
    has_commission:false,
    commission:'',
    lunch:[],
    gender:'',
    contact:'',
    need_num:'',
    hired_num:'',
    need_interview:true,
    interview_time:'',
    interview_place:'',
    requirements:'',
    description:'',
    status: null,
    check_failed_msg: null,
    page_view: null,
    employer_id: null,
    created_at: null,
    updated_at: null,
    skills:[],
    tags:[],
    employer:[]
}

const getters = {

}

const actions = {
    //保存新的兼职
    workStore ( {commit},work) {
        axios({
            url: '/api/works',
            method: 'post',
            headers: {'Authorization': 'Bearer' + localStorage.token},
            data: { work: work}
        })
            .then(function (response) {
                let data = response.data;
                console.log(response);
                if (data.status == 0) {
                    commit(types.STORE_WORK_FAIL,data);
                } else {
                    alert(data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    //根据id获取兼职信息
    workGet ( {commit},id) {
        axios({
            url: '/api/works/'+id,
            method: 'get',
        })
            .then(function (response) {
                let data = response.data;
                console.log(response);
                if (data.status == 0) {
                    commit(types.STORE_WORK_FAIL,data);
                } else {
                    commit(types.STORE_WORK,data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    //根据兼职id获取该兼职对应的标签
    TagsGet ( {commit},id ) {

    }
}

const mutations = {
    [types.STORE_WORK_FAIL] (state,data) {
        state.showAlert =1;
        state.msg = data.msg;
    },
    [types.STORE_WORK] (state,data) {
            state.id = data.work.id;
            state.title = data.work.title;
            state.start_date = data.work.start_date;
            state.end_date = data.work.end_date;
            state.start_time = data.work.start_time;
            state.end_time = data.work.end_time;
            state.city = data.work.city;
            state.district = data.work.district;
            state.address = data.work.address;
            state.pay_amount = data.work.pay_amount;
            state.settlement_type = data.work.settlement_type;
            state.pay_type = data.work.pay_type;
            state.pay_time = data.work.pay_time;
            state.has_commission = Boolean(data.work.has_commission);
            state.commission = data.work.commission;
            state.lunch = String(data.work.lunch).split(",");
            state.gender = data.work.gender;
            state.contact = data.work.contact;
            state.need_num = data.work.need_num;
            state.hired_num = data.work.hired_num;
            state.need_interview = Boolean(data.work.need_interview);
            state.interview_time = data.work.interview_time;
            state.interview_place = data.work.interview_place;
            state.requirements = data.work.requirements;
            state.description = data.work.description;
            state.status = data.work.status;
            state.check_failed_msg = data.work.check_failed_msg;
            state.page_view = data.work.page_view;
            state.employer_id = data.work.employer_id;
            state.created_at = data.work.created_at;
            state.updated_at = data.work.updated_at;
            state.skills = data.skills;
            state.tags = data.tags;
            state.employer = data.employer;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
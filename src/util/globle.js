import Pop from '@/views/Pop.vue'

const obj={}
obj.install=function(Vue){
    const popConstruc = Vue.extend(Pop)
    const pop = new popConstruc()
    pop.$mount(document.createElement('div'))
    document.body.appendChild(pop.$el)
    Vue.prototype.$pop=pop
}
export default obj
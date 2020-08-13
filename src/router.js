import ShowBlogs from './components/ShowBlogs.vue'
import AddBlogs from './components/AddBlog.vue'
import SingleBlog from './components/SingleBlog.vue'
import EditBlog from './components/EdiBtlog.vue'
import ShowTags from './components/ShowTags.vue'
import SingleTag from './components/SingleTag.vue'
import Abulm from './components/Abulm.vue'
export default [
    {
        path: '/',
        component:ShowBlogs
    },
    {
        path: '/add',
        component:AddBlogs
    },
    {
        path: '/blog/:id',
        component: SingleBlog,
        props:true
    },
    {
        path: '/edit/:id',
        component: EditBlog,
        props:true
    },
    {
        path: '/tags/:id',
        component: ShowTags,
        
    },
    {
        path: '/singleTag/:id',
        component:SingleTag
    },
    {
        path: '/ablum',
        component:Abulm
    }
]
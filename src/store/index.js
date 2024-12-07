import { createStore } from 'vuex';

import auth from '../modules/auth/store';
import articles from '../modules/articles/store';
import blog from '../modules/myBlog/store';
import coments from '../modules/coments/store';

const store = createStore({
    modules: {
        auth,
        articles,
        blog,
        coments,
    }
});




export default store;
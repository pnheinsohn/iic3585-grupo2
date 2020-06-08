import albums from './albums';

const state = {
    showModal: false,
};

const getters = {
    showModalId: state => state.showModal,
    modalAlbum: state => {
        const modalAlbum = albums.state.albums.filter(album => album.id == state.showModal)[0]
        console.log(modalAlbum.collections);
        return modalAlbum;
    }
};
  
const actions = {
    changeShowModalState({ commit }, givenState) {
          commit('setShowModal', givenState);  
    }
};

const mutations = {
    setShowModal: (state, givenState) => (state.showModal = givenState),
};

export default {
    state,
    getters,
    actions,
    mutations
};
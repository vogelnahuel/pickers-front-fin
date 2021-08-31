import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/PendingUser";
import { PendingUserAdmin } from "pages/admin/PendingUser/Pickers";



const PendingUserAdminContainer = (props) => {


  const changePage = (page) => {
    props.setActualPage(page);
  }
  
  const loadMore = () => {
   props.setPendingUserExtraFilters({offset:props.filtersExtra.limit,limit:props.pag})
   props.getPendingUser(props.filtersExtra)
   props.setPendingUserExtraFilters({offset:props.filtersExtra.offset+props.pag})
  }


    const titulosAdminPending = [
        "Nombre",
        "DNI",
        "Email",
        "Vehículo",
        "Pendiente hace",
        "Editar",
      ];
      const titulosAdminActive = [
        "Nombre",
        "DNI",
        "Email",
        "Vehículo",
        "Estado",
        "Editar",
      ];
    useEffect(() => {
      const filters = props.actualPage==="PENDING"?{pickerStatusId:"2,3"}:{pickerStatusId:"4,5"};
      props.setPendingUserExtraFilters({limit:window.screen.height<700 || window.screen.height<760 ? 3 : 5})
      props.setPendingUserFilters(filters);
      props.getPendingUser(({...props.filtersExtra, ...filters}));
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.actualPage])
    return (
    <PendingUserAdmin {...props} changePage={changePage} loadMore={loadMore} tableTitles={props.actualPage==="PENDING"?titulosAdminPending:titulosAdminActive}/>
    );
}

const mapStateToProps = (state) => ({
    
    pendingUsers: pendingUserSelectors.getPendingUser(state),
    isFetching: pendingUserSelectors.isFetching(state),
    filters: pendingUserSelectors.getFilters(state),
    filtersExtra: pendingUserSelectors.getFiltersExtra(state),
    seeMore: pendingUserSelectors.getSeeMore(state),
    pag: pendingUserSelectors.getPag(state),
    actualPage:pendingUserSelectors.getActualPage(state)
});

const mapDispatchToProps = (dispatch) => ({
    getPendingUser: (params) => {
        dispatch(pendingUserActions.getPendingUserRequest(params));
    },
    setPendingUserFilters:(filters)=>{
        dispatch(pendingUserActions.setPendingUserFilters(filters));
    },
    setPendingUserExtraFilters:(extraFilters)=>{
      dispatch(pendingUserActions.setPendingUserExtraFilters(extraFilters));
  },
  setActualPage:(page)=>{
    dispatch(pendingUserActions.setActualPage(page));
},
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminContainer);

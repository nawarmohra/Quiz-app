import React from 'react';
import {useLocation, useHistory} from 'react-router'

function withRouter (Child) {
    return (props) => {
         const location = useLocation();
         const history = useHistory();
         // other relevant props
         
         return <Child {...props} history={history} location={location} />;
   }
}

export default withRouter
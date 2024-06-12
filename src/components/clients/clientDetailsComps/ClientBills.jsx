import { useParams } from 'react-router-dom';
import Billings from '../../bills/BillList'

function ClientBills() {
  const { clientId } = useParams();
  console.log(clientId);
    const params = {
      clientId:clientId
    };
  
    return <Billings params={params} />;
}

export default ClientBills;
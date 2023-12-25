import {
   Briefcase,
   ListTask,
   People,
   Bullseye
} from 'react-bootstrap-icons';

export const ProjectsStats = (data) => [
   {
      id: 1,
      title: "Users",
      value: data['user']['total'],
      icon: <People size={18} />,
      statInfo: '<span className="text-dark me-2">' + data['user']['verified'] + '</span> Verified'
   },
   {
      id: 2,
      title: "Active Products",
      value: data['product']['total'],
      icon: <ListTask size={18} />,
      statInfo: '<span className="text-dark me-2">' + data['product']['outOfStock'] + '</span> Out of Stock'
   },
   {
      id: 3,
      title: "Live Bids",
      value: data['bid']['total'],
      icon: <Briefcase size={18} />,
      statInfo: '<span className="text-dark me-2">' + data['bid']['apply'] + '</span> Bid'
   },
   {
      id: 4,
      title: "Orders",
      value: data['order']['total'],
      icon: <Bullseye size={18} />,
      statInfo: '<span className="text-dark me-2">' + data['order']['cancel'] + '</span> Cancel'
   }
];
export default ProjectsStats;

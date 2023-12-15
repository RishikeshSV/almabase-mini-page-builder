import { Items } from "./SidebarData";

const Sidebar = ({ setDraggedItem }) => {
  return (
    <div className="sidebar pd-x-20">
      <div className="sidebar-header">BLOCKS</div>
      <div className="sidebar-items">
        {Items.map((item) => (
          <div
            key={`Item-${item.Id}`}
            className="sidebar-item d-flex"
            draggable //enable div as a draggable
            onDragStart={
              (e) =>
                setDraggedItem({
                  ...item,
                  x: e.clientX - e.currentTarget.getBoundingClientRect().left,
                  y: e.clientY - e.currentTarget.getBoundingClientRect().top,
                }) //calculate the offset
            } //item being dragged
          >
            <i className="fa-solid fa-grip fa-rotate-90" />
            <div className="pd-l-10">{item.Name} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

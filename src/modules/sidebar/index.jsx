import { Items } from "./SidebarData";

const Sidebar = ({ setDraggedItem, uploadFile, downloadFile }) => {
  return (
    <div className="sidebar pd-x-20">
      <div className="sidebar-body">
        <div className="sidebar-header">BLOCKS</div>
        <div className="sidebar-items">
          {Items.map((item) => (
            <div
              //item being dragged
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
              }
            >
              <i className="fa-solid fa-grip fa-rotate-90" />
              <div className="pd-l-10">{item.Name} </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="flex-one" />
        <label className="options" htmlFor="file-upload">
          <i className="fa-solid fa-upload pd-r-8" />
          UPLOAD
          <input
            id="file-upload"
            type="file"
            onChange={(e) => uploadFile(e.target.files[0])}
          />
        </label>
        <div className="options" onClick={() => downloadFile()}>
          <i className="fa-solid fa-download pd-r-8" />
          DOWNLOAD
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

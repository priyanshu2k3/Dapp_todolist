function List(props) {
  var i=-1
  var storage=props.arr
  console.log(props.arr,"this")
    return (
      <div>
        <h4>Here is your to do list ready to be pulished on the blockchain</h4>
        <ul className="list-group">
          { storage.map(element =>( 
  <li key={++i}className="list-group-item">{element} </li>))}
  
</ul>
      </div>
    );
  }
 export  default  List;
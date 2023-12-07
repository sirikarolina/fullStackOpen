const Course = ({course}) => {

  const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h1> {props.course.header}</h1>
      </div>
    )
  }

  const SubHeader = (props) => {
    console.log(props)
    return (
      <div>
        <h2> {props.course.name}</h2>
      </div>
    )
  }
  
  const Part = (props) =>{
    console.log(props)
    return (
      <p>{props.parts.name} {props.parts.exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    const allParts = parts.map(element => {return <Part key={element.id} parts={element} />})
    return (
      <div>
        {allParts}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
    console.log(total)

    return (
      <div>
        <p><b> Number of exercises {total} </b></p>
      </div>
    )
  }
  
    return (
      <div>
        <Header course = {course} />
        <SubHeader course = {course} />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </div>
    )
}

export default Course
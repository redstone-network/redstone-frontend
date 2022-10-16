import React from 'react'

function About() {
  const [pageTitle] = useState('关于页面') //因为加入了unplugin-auto-import 所以不用在手动导入

  return (
    <div>
      <h1>{pageTitle}</h1>
    </div>
  )
}

export default About

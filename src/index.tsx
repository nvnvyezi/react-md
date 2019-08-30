import React, { useContext, useEffect } from 'react'
import ReactDom from 'react-dom'
// import { gray2, gray } from "Styles/colors";

import Content, { IWrittingProps } from './writting'
import Provider, { Context } from './reducer'
import Show from './show'
// interface IMenuList {
//   [index: string]: boolean;
// }

interface IMDProps extends IWrittingProps {
  defaultValue?: string
  height?: number | string
  width?: number | string
}

function typeJudgement(target: any, type: string): boolean {
  return Object.prototype.toString.call(target) === `[object ${type}]`
}

export default function ReactMD(props: IMDProps): JSX.Element {
  const { defaultValue } = props // // 控制菜单某一项的显隐
  let { width, height } = props

  const { dispatch } = useContext(Context)

  width = typeJudgement(width, 'Number') ? width : '100%'
  height = typeJudgement(height, 'Number') ? height : '100%'
  // const [menuList, setMenuList] = useState<IMenuList>({
  //   header: false,
  // });

  useEffect(() => {
    defaultValue &&
      dispatch({
        type: 'mdInput',
        value: String(defaultValue),
      })
  }, [])

  return (
    <Provider>
      <section style={{ width, height: 800 }}>
        <Content />
        <Show />
        <style jsx>{`
          section {
            display: flex;
            justify-content: space-between;
            box-shadow: 0 0 2px 2px gray;
          }
          :global(*) {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}</style>
      </section>
    </Provider>
  )

  // function renderMenu() {
  //   return React.createElement(
  //     'div',
  //     {
  //       className: 'jsx-4106692199' + ' ' + 'wrap',
  //     },
  //     React.createElement('span', {
  //       title: 'header',
  //       onMouseEnter: () => setMenuList({ ...menuList, header: true }),
  //       onMouseLeave: () => setMenuList({ ...menuList, header: false }),
  //       className: 'jsx-4106692199' + ' ' + 'button',
  //     }),
  //     React.createElement(
  //       _JSXStyle,
  //       {
  //         id: '4106692199',
  //       },
  //       '.wrap.jsx-4106692199{padding:0 10px;line-height:38px;border-bottom:1px solid green;background-color:blue;}'
  //     )
  //   )
  // }
}

ReactMD.defaultProps = {}

ReactDom.render(<ReactMD />, document.getElementById('app'))

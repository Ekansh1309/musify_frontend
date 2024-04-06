import React from 'react'
import Card from './Card';

const PlayListView = ({titleText, cardsData}) => {
  return (
    <div className="text-white mt-8">
        <div className="text-2xl font-semibold mb-5">{titleText}</div>
        <div className="w-full flex justify-between space-x-4">
            {
                cardsData.map((item) => {
                    return (
                        <Card
                            title={item.title}
                            description={item.description}
                            imgUrl={item.imgUrl }
                        />
                    );
                })
            }
        </div>
    </div>
  )
}

export default PlayListView

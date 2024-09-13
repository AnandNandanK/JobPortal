import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/jobSlice';


const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hydrabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack", "Data Analyst"]
  },
  {
    filterType: "Salary",
    array: ["10-20K", "20-60K", "60-1Lac", "1Lac to 5Lac", "Baki Tum Uss layak Nahi"]
  }
];

export default function FilterCard() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  // Update the search query whenever selectedValue changes
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
    console.log("Selected Filter: ", selectedValue); // Debugging to check the selected filter value
  }, [selectedValue, dispatch]);

  return (


      <div className='max-w-full bg-slate-50 p-2 rounded-md'>

        <h1 className='font-bold text-xl text-blue-400'>Filter Jobs</h1>

        <div className='w-full text-black outline-none bg-gray-400 mt-2 h-[1px]'></div>

        {/* Radio Group */}
        <RadioGroup defaultValue="" onValueChange={changeHandler} value={selectedValue}>
          {filterData.map((filterItem, filterIndex) => (
            <div key={filterIndex}>
              <h1 className='my-2 font-semibold text-lg'>{filterItem.filterType}</h1>

              {filterItem.array.map((item, itemIndex) => {
                const id = `id${filterIndex}-${itemIndex}`;
                return (
                  <div key={id} className='flex items-center gap-1'>
                    <RadioGroupItem value={item} id={id} />
                    <label htmlFor={id}>{item}</label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>

  );
}

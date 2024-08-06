import ShineBorder from "../magicui/shine-border";
import ShinyButton from "../magicui/shiny-button";
import StyledInput from "./StyledInput";

import StyledSelect from "./StyledSelect";

const Form = () => {
  return (
    <div className="flex items-center justify-center p-20">
      <ShineBorder color="white">
        <div className=" w-96 h-96 rounded-lg p-10 ">
          <form className="flex flex-col gap-5 items-center justify-around">
            <StyledInput type="url" name="post url" label="PIB Post URL" />
            <div className="flex items-center justify-center ">
              <label for="language">Language</label>
              <select
                className="flex flex-col  p-1 absolute w-60 bg-black backdrop-blur-md border translate-y-2 border-stone-50/25 z-50 rounded-sm "
                name="language"
                id="languages"
              >
                <option value="english">English</option>
                <option className="bg-inherit" value="hindi">
                  Hindi
                </option>
                <option value="marathi">Marathi</option>
                <option value="bengali">Bengali</option>
              </select>
            </div>
            <button className="bg-white text-black border rounded-md font-medium p-1 mt-10">
              Generate Video
            </button>
          </form>
        </div>
      </ShineBorder>
    </div>
  );
};

export default Form;

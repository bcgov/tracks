import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import FormGroup from "../../../common/components/FormGroup";

const TravelPathAdd = () => {
  const history = useHistory();

  const [referenceData, setReferenceData] = useState({
    modes: ['WALK', 'CYCLE', 'FLY', 'HORSEBACK', 'WATERCRAFT', 'MOTOR VEHICLE (ON ROAD)', 'MOTOR VEHICLE (OFFROAD)', 'MIXED'],
  });

  return (
    <>
      <h2>Upload a Travel Path</h2>
      <form>
        <div className={'editPane'}>

          <FormGroup>
            <label htmlFor={'mode'}>Mode</label>
            <select name={'mode'}>
              <option disabled selected> Mode</option>

              {referenceData.modes.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}

            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor={'gpxFile'}>GPX File</label>
            <input type={'file'} name={'gpxFile'} />
          </FormGroup>

        </div>

        {(history.length >= 1) &&
        <button onClick={() => history.push('/officer/travel_paths/list')}>Go back</button>
        }
        <button disabled={true} type={"submit"}>Save</button>

      </form>

    </>
  )

};

export default TravelPathAdd;

type Race = {
    raceId: string;
    grandPrix: string;
};

export default function RaceSelector(props: any) {
    const selectedRace: string = props.selected;
    const races: Race[] = props.races;
    const handleChangeResult = props.handleChangeResult;

    return (
        <div className="row mb-4">
            <div className="col-12">
                <select
                    className="form-select form-select-lg"
                    onChange={(e) => handleChangeResult(e.target.value)}
                    style={{
                        width: "50%",
                        textAlign: "center",
                        marginLeft: "25%",
                        borderColor: "lightgray"
                    }}
                    defaultValue={selectedRace == "all" ? "all" : selectedRace}
                >
                    <option key="all" value="all">
                        All
                    </option>
                    {races.map((race) => {
                        return (
                            <option
                                key={`${race.raceId}`}
                                value={`${race.raceId}`}
                            >
                                {race.grandPrix}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

type Team = {
    teamId: string;
    teamName: string;
};

export default function TeamSelector(props: any) {
    const selectedTeam: string = props.selected;
    const teams: Team[] = props.teams;
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
                    defaultValue={selectedTeam == "all" ? "all" : selectedTeam}
                >
                    <option key="all" value="all">
                        All
                    </option>
                    {teams.map((team) => {
                        return (
                            <option
                                key={`${team.teamId}`}
                                value={`${team.teamId}`}
                            >
                                {team.teamName}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

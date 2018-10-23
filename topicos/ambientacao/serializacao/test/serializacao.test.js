test("ciclo completo", () => {

    const objeto = { "ok" : 1, "logico" : true };

    const sequencia = JSON.stringify(objeto);
    const json = JSON.parse(sequencia);

    expect(json).toEqual(objeto);
    expect(Object.keys(json).length).toBe(2);
});
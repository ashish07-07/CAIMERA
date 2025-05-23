router.post("/getuserbyemail", async (req: any, res: any) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user });
});

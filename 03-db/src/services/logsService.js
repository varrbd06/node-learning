import prisma from "../prisma.js"

export async function readStats(filters = {}) {
  const { username, status } = filters;
  const where = { username, status };

  const [total, failed, grouped] = await Promise.all([
    prisma.log.count({ where }),
    prisma.log.count({ where: { ...where, status: "fail" } }),
    prisma.log.groupBy({ by: ["username"], where, _count: true }),
  ]);

  const byUser = grouped.reduce((acc, r) => {
    acc[r.username] = r._count;
    return acc;
  }, {});

  return { total, failed, byUser };
}

export async function getById(id) {
  return prisma.log.findUnique({ where: { id } });
}

export async function create(data) {
  return prisma.log.create({
    data: { ...data, date: new Date(data.date) },
  });
}

export async function remove(id) {
  const res = await prisma.log.deleteMany({ where: { id } });
  return res.count > 0;
}
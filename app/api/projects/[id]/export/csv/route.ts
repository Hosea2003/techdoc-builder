import { exportProjectPointsCSV } from '@/app/(protected)/_actions/equipment-actions';
import { NextResponse } from 'next/server';

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const projectId = parseInt((await params).id, 10);

    const csvString = await exportProjectPointsCSV(projectId);

    if (!csvString) {
        return new NextResponse('Project not found', { status: 404 });
    }

    return new NextResponse(csvString, {
        headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename=project_points_${projectId}.csv`,
        },
    });
}

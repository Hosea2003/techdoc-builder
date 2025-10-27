import { generateProjectPDF } from '@/app/(protected)/_actions/equipment-actions';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string } >}
) {
  const projectId = parseInt((await params).id, 10);

  const pdfBuffer = await generateProjectPDF(projectId);

  if (!pdfBuffer) {
    return new NextResponse('Project not found', { status: 404 });
  }

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=fiche_projet_${projectId}.pdf`,
    },
  });
}
